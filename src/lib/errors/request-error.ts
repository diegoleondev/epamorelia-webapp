import { MESSAGES } from "@/constants";
import { type Details } from "@/validators/validatorHandler";

export interface RequestErrorProps {
  details?: Details;
  name?: string;
}

export class RequestError extends Error {
  public details: Details;

  constructor(props: RequestErrorProps) {
    super(props.name ?? "RequestError");
    this.details = this.parseDetails(props.details ?? {});
  }

  getError(element: string, typeError: string | undefined) {
    if (typeof typeError !== "string") return undefined;

    // @ts-expect-error - I'm not sure how to fix this
    const messages = MESSAGES[element.toUpperCase()];
    const message =
      messages?.[typeError.toUpperCase() as keyof typeof messages];

    return String(message ?? typeError);
  }

  parseDetails(details: Details) {
    return Object.keys(details).reduce<Details>((acc, key) => {
      const value = this.getError(key, details[key]);
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
}

export class SignUpError extends RequestError {
  constructor(props: RequestErrorProps) {
    super({
      name: props.name ?? "SignupError",
      details: props.details,
    });
  }

  parseDetails(props: Details) {
    return {
      username: this.getError("username", props.username),
      email: this.getError("email", props.email),
      password: this.getError("password", props.password),
      invitation: this.getError("invitation", props.invitation),
      _: this.getError("register", props._),
    };
  }
}

export class GetInvitationError extends RequestError {
  constructor(props: RequestErrorProps) {
    super({
      name: props.name ?? "GetUserNameError",
      details: props.details,
    });
  }

  parseDetails(props: Details) {
    return {
      id: this.getError("id", props.id),
      _: this.getError("register", props._),
    };
  }
}

export class LoginError extends RequestError {
  constructor(props: RequestErrorProps) {
    super({
      name: props.name ?? "LoginError",
      details: props.details,
    });
  }

  parseDetails(props: Details) {
    return {
      email: this.getError("email", props.email),
      password: this.getError("password", props.password),
      _: this.getError("login", props._),
    };
  }
}
