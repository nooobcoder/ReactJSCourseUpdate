import * as React from "react";
import { Account, Auth } from "../components/index";
import { supabase } from "../utils/supabaseClient"

export default function Home() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_e, session) => { setSession(session) })
  });

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}
