import axios from 'axios';

export async function post(link,data){
    var headers={
        'Authorization':'Bearer '+sessionStorage.getItem('token')
    }
    var result;
    await axios.post(
        link,data,{headers:headers}
    ).then(res=>{
        result = res.data
    }).catch(err=>{
        if(err.response.status===401 || err.response.status===403){
            window.location.assign('/login=')
        }else{
            result= err
        }
    })
    return result
};
export async function hapus(link){
    var headers={
        'Authorization':'Bearer '+sessionStorage.getItem('token')
    }
    var result
    await axios.delete(
        link,{headers:headers}
    ).then(res=>{
        result = res.data
    }).catch(err=>{
        if(err.response.status===401 || err.response.status===403){
            window.location.assign('/login')
        }else{
            result = err
        }
    })
    return result
};
export async function get(link){
    var headers={
        'Authorization':'Bearer '+sessionStorage.getItem('token')
    }
    var data;
    await axios.get(
        link,{headers:headers}
    ).then(res=>{
        data = res.data
    }).catch(err=>{
        if(err.response){
            if(err.response.status===401 || err.response.status===403){
                window.location.assign('/login')
            }else{
                data = err
            }
        }else{
            alert(err)
        }
        
    })
    return data
};