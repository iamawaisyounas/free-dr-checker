const RDAP_BOOTSTRAP = "https://data.iana.org/rdap/dns.json";
const RDAP_FALLBACK = "https://rdap.org/domain/";

type RdapEvent = {
  eventAction?: string;
  eventDate?: string;
};

type RdapEntity = {
  roles?: string[];
  vcardArray?: [string, unknown[]];
};

type RdapBootstrap = {
  services?: Array<[string[], string[]]>;
};

let bootstrapCache: RdapBootstrap | null = null;

async function fetchBootstrap() {
  if (bootstrapCache) {
    return bootstrapCache;
  }

  const res = await fetch(RDAP_BOOTSTRAP, {
    headers: { Accept: "application/json" },
    next: { revalidate: 86400 }
  });

  if (!res.ok) {
    return null;
  }

  bootstrapCache = await res.json() as RdapBootstrap;
  return bootstrapCache;
}

async function rdapUrlForDomain(domain: string) {
  const tld = domain.toLowerCase().split(".").pop();
  const bootstrap = tld ? await fetchBootstrap().catch(() => null) : null;
  const service = bootstrap?.services?.find(([tlds]) => tlds.some((item) => item.toLowerCase() === tld));
  const baseUrl = service?.[1]?.[0];

  if (!baseUrl) {
    return `${RDAP_FALLBACK}${encodeURIComponent(domain)}`;
  }

  return `${baseUrl.replace(/\/+$/, "")}/domain/${encodeURIComponent(domain)}`;
}

function findVcardValue(entity: RdapEntity | undefined, key: string) {
  const rows = entity?.vcardArray?.[1];
  if (!Array.isArray(rows)) {
    return null;
  }

  const row = rows.find((item) => Array.isArray(item) && item[0] === key);
  return Array.isArray(row) && typeof row[3] === "string" ? row[3] : null;
}

export async function fetchDomainAge(domain: string) {
  const url = await rdapUrlForDomain(domain);
  const res = await fetch(url, {
    headers: { Accept: "application/rdap+json" },
    cache: "no-store"
  });

  if (res.status === 404) {
    return { domain, status: "not_found" as const };
  }

  if (!res.ok) {
    return { domain, status: "unavailable" as const };
  }

  const data = await res.json() as {
    events?: RdapEvent[];
    entities?: RdapEntity[];
    status?: string[];
    nameservers?: { ldhName?: string }[];
    secureDNS?: { delegationSigned?: boolean };
  };

  const registrationEvent = data.events?.find((event) => event.eventAction === "registration");
  const expiryEvent = data.events?.find((event) => event.eventAction === "expiration");

  if (!registrationEvent?.eventDate) {
    return { domain, status: "no_registration_data" as const };
  }

  const createdDate = new Date(registrationEvent.eventDate);
  if (Number.isNaN(createdDate.getTime())) {
    return { domain, status: "no_registration_data" as const };
  }

  const ageInDays = Math.max(0, Math.floor((Date.now() - createdDate.getTime()) / 86400000));
  const registrar = data.entities?.find((entity) => entity.roles?.includes("registrar"));

  return {
    domain,
    status: "ok" as const,
    created_date: registrationEvent.eventDate,
    expiry_date: expiryEvent?.eventDate ?? null,
    age_years: +(ageInDays / 365.25).toFixed(1),
    registrar: findVcardValue(registrar, "fn"),
    nameservers: data.nameservers?.map((item) => item.ldhName).filter(Boolean).slice(0, 4) ?? [],
    dnssec: data.secureDNS?.delegationSigned ?? null,
    registry_status: data.status ?? []
  };
}
