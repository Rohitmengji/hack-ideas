import { createContext, useContext, useState } from "react";

const UserChallengeContext = createContext();

export const UserChallengeProvider = ({ children }) => {
  const [empId, setEmpId] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    tags: "",
  });

  return (
    <UserChallengeContext.Provider
      value={{
        empId,
        setEmpId,
        challenges,
        setChallenges,
        newChallenge,
        setNewChallenge,
      }}
    >
      {children}
    </UserChallengeContext.Provider>
  );
};


export const useUserChallengeContext = () => {
    return useContext(UserChallengeContext);
  };
