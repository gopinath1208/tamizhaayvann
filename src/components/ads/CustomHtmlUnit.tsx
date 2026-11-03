import React from 'react';
import { AdvertisementItem } from '../../types/advertisement';

interface CustomHtmlUnitProps {
  ad: AdvertisementItem;
  onAdClick: () => void;
}

export const CustomHtmlUnit: React.FC<CustomHtmlUnitProps> = ({ ad, onAdClick }) => {
  const html = ad.customHtml?.rawHtml || '';

  if (!html) return null;

  return (
    <div
      onClick={onAdClick}
      className="w-full h-full min-h-[90px] overflow-hidden rounded bg-stone-50 border border-stone-200"
    >
      <iframe
        title={ad.name}
        srcDoc={`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { margin: 0; padding: 0; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; overflow: hidden; }
              </style>
            </head>
            <body>
              ${html}
            </body>
          </html>
        `}
        sandbox="allow-scripts allow-popups allow-same-origin"
        className="w-full h-full border-0 min-h-[90px]"
        loading="lazy"
      />
    </div>
  );
};
