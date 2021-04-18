import React, {useState, createContext, useMemo} from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const userTest = {"_id":{"$oid":"607b3025844b5c2aa56ac12a"},"avatar":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3694920833893412&height=200&width=200&ext=1621334009&hash=AeTtKgRvgvOLivi1ZHI","isVerified":true,"userRole":4,"hasStore":[],"notifications":[{"$oid":"607c0ae9ad31635df6fbebcc"}],"followedStore":[],"reviews":[],"fbUid":"3694920833893412","fbName":"Lin Julian","email":"sres3416@gmail.com","createdAt":{"$date":"2021-04-17T18:59:49.843Z"},"updatedAt":{"$date":"2021-04-18T10:33:30.111Z"},"__v":1,"fbToken":"EAAEfPGSZAvUQBAJomGBrv9Loj4hamMTzr2oH0rhoc9fcPAcRJHIZBAIqnlZBCZBKZAPhqPfCz3Q3xqZBb4Ol75uJB4Lb5DMJ8QtZCXMmgtofQmCu4TvwDyPZAKFZC1FDKTqdCO3hRO406CrZCc8TZAoUUHqEe5aEiKqQuJE0bmZApH3j5wZDZD"};
    const [user, setUser] = useState(userTest);
    const providerUser = useMemo(() => ([ user, setUser ]), [user, setUser]);

    return (
        <UserContext.Provider value={providerUser}>
            {props.children}
        </UserContext.Provider>
    );
};
