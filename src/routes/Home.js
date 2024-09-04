import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore"; 

const Home = ( {userObj} ) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id, 
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (nweet === "") {
            return;
        }
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };

    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <button type="submit">Nweet</button>
        </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
