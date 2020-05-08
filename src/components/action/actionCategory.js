import actionFetch from "./actionFetch";
import getGQL from "../getGQL";
let GQL = getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql");
export default function actionCategory(_id) {
    const query = [{ _id }]

    return actionFetch("category", GQL(
        `query gf($query: String){
               CategoryFindOne(query: $query){
                _id
                name
                goods {
                  _id
                  name
                  images{
                    url
                  }
                }    
              }
            }`,
        { query: JSON.stringify(query) }
    ))
}