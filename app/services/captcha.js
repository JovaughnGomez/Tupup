import { Solver } from "@2captcha/captcha-solver";
import { data } from "autoprefixer";

const solver = new Solver(process.env.TWOCAPTCHA_API_KEY);

export async function solveGeeTestCaptcha(img) {
    try {
        const results = await solver.coordinates({
            body: img,
        })

      return { success: true, data: results.data, id: results.id, solver }
    } catch (error) {
      console.error('Error solving GeeTest:', error);
      return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
  }
