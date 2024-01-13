import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

const AuthDetails = ({
    authUser,
    setAuthUser,
    hasSignedOut,
    setHasSignedOut,
}) => {
    //const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, [setAuthUser]);

    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                //console.log("User signed out");
                setHasSignedOut(true);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            {authUser ? (
                <>
                    <p>{`Signed in as ${authUser.email}`}</p>
                    <button onClick={userSignOut}>Sign Out</button>
                </>
            ) : (
                hasSignedOut && <p>Signed Out</p>
            )}
        </div>
    );
};

export default AuthDetails;
