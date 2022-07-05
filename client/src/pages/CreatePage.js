import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState('');
    const {request} = useHttp();

    useEffect(() => {
        window.M.updateTextFields();
    }, [])

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: 'Bearer ' + auth.token
                });
                console.log(data);
                navigate(`/detail/${data.link.id}`);
            } catch (e) {}
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input 
                        placeholder='insert link'
                        id="link" 
                        type="text" 
                        value={link}
                        onChange={e=> setLink(e.target.value)}
                        onKeyUp={pressHandler}/>
                    <label htmlFor="link">insert link</label>
                </div>
            </div>  
        </div>
    )
}