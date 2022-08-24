

export const request = (input) => {

    const api = 'http://localhost:8000/graphql';
    const requestBody = {
        query: `
          query {
              events {
                  _id
                  title
                  description
                  date
                  price
                  creator {
                    _id
                    email
                }
              }
          }
        `
    };


let mark = ''
let events = ''

    const res = 
        fetch(api, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201){
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then (data => {
            events = data.data.events;
            console.log(events)
       // })
        

        const dataReceived = data.data.events.map((item, index) => {
            let image;
            const id = index + 1;

            if (id % 3 === 0){
                image = 'illustration-grow-together.svg'
            } else if (id % 2 === 0) { 
                image = 'illustration-your-users.svg'
            } else {
                image = 'illustration-flowing-conversation.svg'
            }



            if (item.title.split(' ').join('%20').toLowerCase().includes(input)){
                mark = '1'
            return {
                id,
                name: item.description,
                creator: item.creator,
                date: item.date,
                price: item.price,
                title: item.title,
                image
            }
        }
        return {}
        });

        function isNotNull(value) {
            return value.id;
          }

        console.log(dataReceived.filter(isNotNull), 'a' )

        return dataReceived.filter(isNotNull) ;
    });

    return res;
}
