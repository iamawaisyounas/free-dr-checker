const RDAP_BOOTSTRAP = "https://rdap.org/domain/";

type RdapEvent = {
  eventAction?: string;
  eventDate?: string;
};

type RdapEntity = {
  roles?: string[];
  vcardArray?: [string, unknown[]];
};

function findVcardValue(entity: RdapEntity | undefined, key: string) {
  const rows = entity?.vcardArray?.[1];
  if (!Array.isArray(rows)) {
    return null;
  }

  const row = rows.find((item) => Array.isArray(item) && item[0] === key);
  return Array.isArray(row) && typeof row[3] === "string" ? row[3] : null;
}

export async function fetchDomainAge(domain: string) {
  const res = await fetch(`${RDAP_BOOTSTRAP}${encodeURIComponent(domain)}`, {
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
