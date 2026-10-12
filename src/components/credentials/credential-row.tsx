import { getTranslations } from "next-intl/server";
import { Drawer } from "@/components/ui/drawer.client";
import { pick } from "@/content/localize";
import type { Credential } from "@/content/types";
import type { Locale } from "@/i18n/routing";

// design.md §6: "Label, number, issuer, season, 'View document' opens
// Evidence drawer with source link and date checked."
export async function CredentialRow({
  credential,
  locale,
}: {
  credential: Credential;
  locale: Locale;
}) {
  const t = await getTranslations();
  const label = pick(credential.label, locale);

  return (
    <li className="flex items-center justify-between gap-4 border-b border-line py-4">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-small text-stone">
          {credential.issuer} · {credential.validity}
        </p>
      </div>
      <Drawer
        trigger={
          <span className="text-crimson underline underline-offset-4">
            {t("common.viewDocument")}
          </span>
        }
        title={label}
      >
        <dl className="space-y-4 text-small">
          <div>
            <dt className="text-stone">{t("credentials.issuedBy")}</dt>
            <dd>{credential.issuer}</dd>
          </div>
          {credential.number && (
            <div>
              <dt className="text-stone">Number</dt>
              <dd>{credential.number}</dd>
            </div>
          )}
          <div>
            <dt className="text-stone">{t("credentials.checkedOn")}</dt>
            <dd>{credential.checkedOn}</dd>
          </div>
          <div>
            <a
              href={credential.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-crimson underline underline-offset-4"
            >
              {t("common.viewDocument")}
            </a>
          </div>
        </dl>
      </Drawer>
    </li>
  );
}
