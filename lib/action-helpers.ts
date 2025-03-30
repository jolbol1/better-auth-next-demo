/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any;
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData));
    console.log(result);
    if (!result.success) {
      console.log(result.error.errors);
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, formData);
  };
}
