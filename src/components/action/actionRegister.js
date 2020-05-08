import actionFetch from "./actionFetch";
import actionLogin from "./actionLogin";
import getGQL from "../getGQL";
let GQL = getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql");
export default function actionRegister(login, password) {
    return (async dispatch => {


        let reg = await dispatch(actionFetch("reg", GQL(
            `mutation reg($login: String, $password: String){
          UserUpsert(user: {login:$login, password: $password})
          {_id 
            login
          }
      }`,
            {login, password}
            )
        ))
        await dispatch(actionLogin(login, password))


        console.log(reg)

    })
}