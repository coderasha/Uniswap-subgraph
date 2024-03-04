import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [tokens, setTokens] = useState([]);
  const QueryURL = "https://gateway.thegraph.com/api/6f9d8275fa98eef5c0b958d0a53842fc/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";
  const client = createClient({
    url: QueryURL
  });
  const query =
    `
    {
      tokens(first: 5) {
        id
        name
        decimals
      }
     
    }
  `;

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      setTokens(data.tokens);
    };
    getTokens();
    
  }, []);
  

  return (
    <>
      <div>
        <h1>Tokens Information</h1>
        {tokens !== null && tokens.length > 0 && tokens.map((token) => {
          console.log(token)
          return (
            <div key={token.id}>
              <div>{token.id}</div>
              <div>{token.name}</div>
              <div>{token.decimals}</div>
              
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;