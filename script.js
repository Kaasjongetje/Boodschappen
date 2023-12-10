import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log('hello')

const url = "https://jscgkvmmxlzvvnpyldma.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzY2drdm1teGx6dnZucHlsZG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MzY1MjYsImV4cCI6MjAxNzAxMjUyNn0.8fDSoj_BrFTqZuhTAROwcvOM7pnnTSotypCT1BaQzJQ"

const supabase = createClient(url, key)

const data = await supabase.auth.getSession().data

console.log(data)

if (!data) {
    supabase.auth.signInWithOAuth({
        provider: 'google',
    })
      
}


/*
Client ID
538227424255-42s6eil8fsfmn8r4oadncsqggji20m31.apps.googleusercontent.com
*/

/*
Client Secret
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
*/

// git@github.com:Kaasjongetje/Boodschappen.git
