import { useEffect, useState } from 'react';
import { TNullableNumeric } from 'types/common.type';
import { retryFunc } from 'utils/func';
import { IUsePartyReturns } from './Party.type';

export const useParty = (): IUsePartyReturns => {
  const [partyImgHeight, setPartyImgHeight] = useState<TNullableNumeric>(null);

  useEffect(() => {
    const pagePadding = 14;
    retryFunc((done, retry) => {
      const rootWidth = document.getElementById('root')?.clientWidth;
      if (!rootWidth) retry();
      else {
        setPartyImgHeight((rootWidth - (3 * pagePadding)) / 2);
        done();
      }
    });
    window.onresize = (() => {
      const rootWidth = document.getElementById('root')?.clientWidth;
      if (rootWidth) setPartyImgHeight((rootWidth - (3 * pagePadding)) / 2);
    });
  }, []);

  return {
    partyImgHeight,
  };
};
