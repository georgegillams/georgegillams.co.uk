import { datumCreate } from "../datum";
import authentication from "../../utils/authentication";
import { UNAUTHORISED_WRITE } from "../../../src/utils/constants";

export default function contact(req) {
  return new Promise((resolve, reject) => {
    resolve(require("./contact.vcf"));
  });
}
