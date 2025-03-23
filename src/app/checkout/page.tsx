import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

const Checkout = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Checkout page content</p>
    </div>
  );
};

export default Checkout;
