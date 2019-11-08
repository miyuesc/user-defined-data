import AV from "../utils/leancloud";

export const doSignIn = async (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    AV.User.logIn(username, password).then((userInfo: any) => {
      console.log(userInfo);
      resolve(userInfo);
    });
  });
};

export const doSignUp = async (username: string, password: string, email: string) => {
  return new Promise((resolve, reject) => {
    let user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(email);
    user.signUp().then(
      (userInfo: any) => {
        resolve(userInfo);
      },
      (error: any) => {
        reject(error);
      }
    );
  });
};
