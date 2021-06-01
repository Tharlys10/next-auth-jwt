import { v4 as uuid } from 'uuid';


const delay = (amount: number) => new Promise(resolve => setTimeout(resolve, amount));

interface ISignInRequestData {
  email: string;
  password: string;
}

export async function singInRequest(data: ISignInRequestData) {
  await delay(750);

  return {
    token: uuid(),
    user: {
      name: "Tharlys Alves",
      email: "tharlys2015c@gmail.com",
      avatar_url: "https://github.com/Tharlys10.png"
    }
  }
}

export async function profileUser() {
  await delay(750);

  return {
    name: "Tharlys Alves",
    email: "tharlys2015c@gmail.com",
    avatar_url: "https://github.com/Tharlys10.png"
  }
}