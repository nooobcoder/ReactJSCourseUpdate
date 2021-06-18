import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setContent } from "../context/contentSlice";
import { FirebaseContext } from "../context/firebaseContext";

const GetFirebaseWatchContent = (target) => {
  const { firebaseConnection } = useContext(FirebaseContext);

  const actionDispatcher = useDispatch();

  useEffect(() => {
    const fireStoreFetch = async () => {
      const snap = await firebaseConnection
        .firestore()
        .collection(target)
        .get();

      const allContent = snap.docs.map((contentObj) => ({
        ...contentObj.data(),
        docId: contentObj.id,
      }));
      actionDispatcher(setContent({ [target]: allContent }));
    };

    fireStoreFetch();
  }, [actionDispatcher, target, firebaseConnection]);
};

export default GetFirebaseWatchContent;
