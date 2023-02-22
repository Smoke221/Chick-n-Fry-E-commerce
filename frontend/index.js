fetch("http://localhost:1010/home",{
    method:"GET",
    headers:{
        "Content-type":"text/html"
    }
})
.then(res => res.end())
.then(res => console.log(res))
.err(err => console.log(err))