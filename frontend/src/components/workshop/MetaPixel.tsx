import { extractMetaPixelId, getMetaPixelBootstrapScript } from "@/lib/meta-pixel";

type Props = {
  /** Raw Pixel ID or full Meta Pixel snippet from admin */
  code: string;
};

/**
 * Server-rendered Meta Pixel. Inline script is in the initial HTML so Meta
 * Events Manager can detect it and enable “Setup Event”.
 */
export default function MetaPixel({ code }: Props) {
  const pixelId = extractMetaPixelId(code);
  if (!pixelId) return null;

  return (
    <>
      {/* Meta Pixel Code */}
      <script
        dangerouslySetInnerHTML={{
          __html: getMetaPixelBootstrapScript(pixelId),
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}
    </>
  );
}
