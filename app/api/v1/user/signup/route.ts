const {recaptchaValidator} = require("../../../middlewares/recaptchaValidator");
import { NextResponse } from "next/server";


export async function POST(req: Request, res: Response) {

    const postData = await req.json()

    const { captchaToken } = postData;

    const isRobot = await recaptchaValidator(captchaToken)

    return NextResponse.json(isRobot)

}