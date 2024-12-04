import * as process from "node:process";

export default () => ({
  roundsOfHashing: parseInt(process.env.HASHING),
  secret: process.env.JWT_SECRET
})