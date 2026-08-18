import { useRef } from 'react';
import { storage } from '../storageConfig';
import { ref, uploadBytes } from 'firebase/storage';

const RefUpload = () => {
  const inputFile = useRef();

  const fileUpload = () => {
    const file = inputFile.current.files[0];
    if (!file) {
      alert('파일을 선택하세요.');
      return;
    }

    const imageRef = ref(storage, `files/${Date.now()}_${file.name}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        console.log('업로드 성공', snapshot);
        alert('파일 업로드 성공');
        inputFile.current.value = '';
      })
      .catch((err) => {
        console.error(err);
        alert('업로드에 실패했습니다.');
      });
  };

  return (
    <>
      <h2>Firebase Storage - Ref를 활용한 업로드</h2>
      <input type="file" ref={inputFile} />
      <button type="button" onClick={fileUpload}>업로드</button>
    </>
  );
};

export default RefUpload;
