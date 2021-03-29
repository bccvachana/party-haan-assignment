import {
  useState, useMemo, FormEvent, useRef,
} from 'react';
import { get, getOr, toNumber } from 'lodash/fp';
import { openModal } from 'components/Modal';
import { TNotReturnFunction } from 'types/common.type';
import { useHistory } from 'react-router-dom';
import partyService from 'services/party.service';
import { useUser } from 'hooks';
import axios from 'axios';
import { setIsPageLoading } from 'store/page/func';
import { IUseCreatePartyReturns } from './CreateParty.type';

const createPartyError = {
  minNumPeople: {
    message: 'minNumPeople',
    text: 'ต้องมีจำนวนคนที่ขาดอย่างน้อย 1 คน',
  },
  createParty: {
    message: 'createParty',
    text: 'สร้างปาร์ตี้ไม่สำเร็จ',
  },
};

export const useCreateParty = (): IUseCreatePartyReturns => {
  const user = useUser();
  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useHistory();

  const onChange = useMemo<TNotReturnFunction>(
    () => () => {
      const name = get('current.name.value', formRef);
      const numPeople = get('current.numPeople.value', formRef);
      if (name && numPeople) setIsDisableSubmit(false);
      else setIsDisableSubmit(true);
    }, [],
  );

  const handleCreateParty = useMemo<(event: FormEvent<HTMLFormElement>) => void>(
    () => async (event) => {
      setIsPageLoading(true);
      event.preventDefault();
      try {
        const name = get('current.name.value', formRef);
        const numPeople = toNumber(get('current.numPeople.value', formRef));
        if (numPeople <= 0) {
          throw new Error(
            createPartyError.minNumPeople.message,
          );
        }
        const image = await axios.get(
          'https://source.unsplash.com/random/?food,goods,party,ticket,shirt,bag',
        );
        await partyService.create({
          userId: get('id', user) as number,
          name,
          numPeople,
          imgUrl: getOr('', 'request.responseURL', image),
        });
        setIsPageLoading(false);
        openModal({
          type: 'info',
          text: 'สร้างปาร์ตี้สำเร็จ',
          okText: 'ตกลง',
          onOk: () => {
            push('/party');
          },
          isCancel: false,
        });
      } catch (err) {
        setIsPageLoading(false);
        openModal({
          type: 'error',
          text: get('response.data', err)
            ? get('createParty.text', createPartyError)
            : get(`${err.message}.text`, createPartyError),
          okText: 'ลองอีกครั้ง',
        });
      }
    }, []);

  return {
    formRef,
    isDisableSubmit,
    onChange,
    handleCreateParty,
  };
};
