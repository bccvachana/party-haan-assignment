import { openModal } from 'components/Modal';
import { useUser } from 'hooks';
import { get } from 'lodash/fp';
import { useEffect, useMemo, useState } from 'react';
import partyService from 'services/party.service';
import userService from 'services/user.service';
import { setIsPageLoading } from 'store/page/func';
import { TNullableNumeric } from 'types/common.type';
import { IParty } from 'types/party.type';
import { retryFunc } from 'utils/func';
import { IUsePartyReturns } from './Party.type';

export const useParty = (): IUsePartyReturns => {
  const [partyImgHeight, setPartyImgHeight] = useState<TNullableNumeric>(null);
  const [party, setParty] = useState<IParty[]>([]);
  const user = useUser();

  useEffect(() => {
    setIsPageLoading(true);
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
    (async () => {
      setParty(await partyService.find());
      setIsPageLoading(false);
    })();
  }, []);

  const handleJoinParty = useMemo<(partyId: number) => void>(
    () => async (partyId: number) => {
      setIsPageLoading(true);
      try {
        setIsPageLoading(false);
        openModal({
          type: 'info',
          text: 'ยืนยันการเข้าร่วมปาร์ตี้',
          onOk: async () => {
            await partyService.join({
              userId: get('id', user) as number,
              partyId,
            });
            setIsPageLoading(true);
            setParty(await partyService.find());
            await userService.findParticipatedParty();
            setIsPageLoading(false);
          },
        });
      } catch (err) {
        setIsPageLoading(false);
        openModal({
          type: 'error',
          text: 'เข้าร่วมปาร์ตี้ไม่สำเร็จ',
          okText: 'ลองอีกครั้ง',
        });
      }
    }, []);

  return {
    partyImgHeight,
    party,
    handleJoinParty,
  };
};
