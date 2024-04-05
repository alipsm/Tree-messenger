export const useFormValidation = () => {
   const getValidation = (
      data: object
   ): { status: boolean; message: string; field: string } => {
      var checkedStatusItems = [];
      for (const key in data) {
         if (Object.prototype.hasOwnProperty.call(data, key)) {
            checkedStatusItems.push(key);
            if (typeof data === "object") {
            }
            let element: [string] = [`${data[key as keyof typeof data]}`];
            if (key === "confirm-password") {
               element.push(data["password" as keyof typeof data]);
            }
            const resultValidation = validation(key, element);
            if (!resultValidation.status) {
               return {
                  status: resultValidation.status,
                  message: resultValidation.message,
                  field: key,
               };
            }
         }
      }
      return {
         status: true,
         message: `Validation was done for: ${checkedStatusItems.join(" , ")}`,
         field: "",
      };
   };

   return { getValidation };
};

export default useFormValidation;

function validation(
   type: string,
   value: [string, string?]
): { status: boolean; message: string } {
   // console.log(argument)
   var CHECK = true;
   var message = "h";

   switch (type) {
      case "username":
         CHECK = value[0]?.length >= 5 ? true : false;
         if (!CHECK) {
            message = "Username must be more than 5 characters";
         }
         break;
      case "email":
         let email = /\S+@\S+\.\S+/;
         CHECK = email.test(value[0]);
         if (!CHECK) {
            message = "Email format is incorrect";
         }
         break;
      case "password":
         CHECK = true;
         const checkLenghtPass = new RegExp("(?=.{6,})"); //check lenght pass
         if (!checkLenghtPass.test(value[0])) {
            CHECK = false;
            message = "Password must be more than 8 characters.";
         }
         break;
      case "confirm-password":
         CHECK = true;
         if (value[0] !== value[1]) {
            CHECK = false;
            message = "Passwords are not the same.";
         }
         break;

      case "g-recaptcha-response":
         CHECK = value[0]?.length >= 5 ? true : false;
         if (!CHECK) {
            message = "Please complete the Recaptcha";
         }
         break;
         break;
      default:
         break;
   }
   return { status: CHECK, message };
}