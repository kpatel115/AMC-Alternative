
export const server_details = {
    // gets the details data 
        get: (id:string) => {
            fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${id}&currentCountry=US`, 
            {
                'method': 'GET',
                'headers': {
                    'X-RapidAPI-Key': '2abbd4e4e2msh5ca2ceb936a68dap1c7153jsn56d0a6ae36ea',
                    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
                }
            })
            .then((response) => {
                console.log(response.json)
                return response.json();
            })
            .then(data => {
                console.log('Data from Details API: ', data)
                console.log(data)
                return data.results
            })
            .catch(err => {
                console.error('error fetching data', err);
            });
        }
    }