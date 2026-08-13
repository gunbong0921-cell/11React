import { firestore } from './firestoreConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const FireConnect = () => {
  //파이어스토어 연결 확인
  console.log('firestore', firestore);

  //문서(도큐먼트) 추가 함수
  /**
  컬렉션 : 테이블과 유사함. 하위에 문서가 추가되면서 데이터가 저장된다. 
  문서 : 테이블의 행과 유사함. 컬렉션 하위에 추가되면서 데이터가 저장된다.
   */
  const addMessage = async () => {
    /**
    문서 추가 함수
    형식] await setDoc(doc(firestore, '컬렉션', '문서'), {데이터});
     */
    await setDoc(doc(firestore, 'React', 'Firebase'), {
      category: '파이어스토어',
      book: 'React로 개발자되기',
      Publisher: '골든래빗',
    });
    console.log('입력성공');
  };

  const getMessage = async () => {
    const docRef = doc(firestore, 'React', 'Firebase');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('문서', docSnap.data());
    }
    else {
      console.log('문서가 존재하지 않습니다.');
    }
  };

  return (
    <>
      <h2>파이어스토어 연결</h2>
      <input type="button" value="입력Test" onClick={addMessage} />
      <input type="button" value="읽기Test" onClick={getMessage} />
    </>
  );
};

export default FireConnect;
