import { useEffect, useState } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import { useFinishCallback } from 'hooks/useFinishCallback';
import { CREATE_BUCKET, FINISH_POPUP } from 'stores/popup-store';
import Card from 'components/Card';
import usePopup from 'hooks/usePopup';
import Popup from 'reactjs-popup';
import { useCreateBucket } from 'hooks/useCreateBucket';

export const CreateBucketPopup = () => {
  const [loading, setLoading] = useState(false);
  const { shown, hide: hidePlay } = usePopup(CREATE_BUCKET);
  const { show: showFinish } = usePopup(FINISH_POPUP);
  const [name, setName] = useState('');
  const {
    isLoading,
    createBucket
  } = useCreateBucket(name)

  const onChange = (event: any) => 
    setName(event.target.value);

  useFinishCallback(() => {
    hidePlay();
    showFinish({});
  });

  useEffect(() => {
    if (shown) setLoading(false);
  }, [shown]);

  const pay = async () => {
    setLoading(true);
    try {
      await createBucket()
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Popup open={shown} onClose={hidePlay}>
      <div className="slider flex flex-col items-center">
        <input
         type='text'
         className='text-black' 
         value={name} 
         onChange={onChange}
         />

        <Card
          className="min-w-[200px] top-space uppercase flex flex-row justify-center items-center"
          disabled={loading}
          onClick={pay}
        >
          {isLoading ? 'Creating bucket...' : 'Create bucket '}
          {!isLoading && <FaStar className='ml-1' color={'#fce250'} />}
        </Card>
      </div>
      <div className="popup-close" onClick={hidePlay}>
        <FaTimes />
      </div>
    </Popup>
  );
};
