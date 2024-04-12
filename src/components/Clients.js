import {useEffect, useState} from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function Clients() {
    const auth = useAuthUser();
    const [datas, setDatas] = useState([]);
    const [statusCl, setStatusCl] = useState([]);
    const [btnState, setBtnState] = useState([]);
    const [dataIsReady, setDataIsReady] = useState(false);
    useEffect(() => {
        fetch(process.env.REACT_APP_STATE1 + "/clients/responsible", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({responsible: auth.fullName})
        })
            .then(r => r.json())
            .then(resp => {
                setBtnState(resp.map(() => false));
                setDatas(resp)
                setDataIsReady(true);
            })
            .catch(err => {
                console.log(err)
            })

    }, []);
    useEffect(() => {
        if (statusCl.length) {
            fetch(process.env.REACT_APP_STATE1 + "/clients/" + datas[statusCl[1]]["_id"], {
                method: "PATCH", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    status: statusCl[0]
                })
            })
                .then(resp => {
                    console.log(resp)
                    alert(`Статус клиента изменен`);
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [statusCl])
    return (
        <div className="clients">
            <h1>
                Таблица клиентов авторизованного
                пользователя
            </h1>
            {dataIsReady ? <table>
                    <thead>
                    <th scope="col">Номер счета</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Отчество</th>
                    <th scope="col">Дата рождения</th>
                    <th scope="col">ИНН</th>
                    <th scope="col">Статус</th>
                    <tbody>
                    {
                        datas.map((item, i) => <tr key={i}>
                            <th scope="row">{item.accountNumber}</th>
                            <td>{item.lastName}</td>
                            <td>{item.firstName}</td>
                            <td>{item.surName}</td>
                            <td>{item.birthDay}</td>
                            <td>{item.tin}</td>
                            <td className="clients__status-area">
                                <div className="clients__status-area--top">
                                <span style={{
                                    color: item.status === "Не в работе" ? "yellowgreen"
                                        : item.status === "В работе" ? "blue"
                                            : item.status === "Отказ" ? "#d8003f" : "green", paddingRight: "1em"
                                }}>{item.status}</span>
                                    <button name={i + ""} onClick={(event) => {
                                        setBtnState(btnState.map((el, i) => i + "" === event.target.name ? !el : el))
                                    }}>
                                        &#9998;
                                    </button>
                                </div>
                                <form style={{display: !btnState[i] ? "none" : "flex"}} onChange={(event) => {
                                    if (event.target.checked) {
                                        setStatusCl([event.target.value, i])
                                    }
                                }} className="clients__change-status-area">
                                    <div className="clients__ratio-box">
                                        <input type="radio" id="html" name="fav_language" value="В работе"/>
                                        <label htmlFor="html">В работе</label><br/>
                                    </div>
                                    <div className="clients__ratio-box">
                                        <input type="radio" id="css" name="fav_language" value="Отказ"/>
                                        <label htmlFor="css">Отказ</label><br/>
                                    </div>
                                    <div className="clients__ratio-box">
                                        <input type="radio" id="javascript" name="fav_language" value="Сделка закрыта"/>
                                        <label htmlFor="javascript">Сделка закрыта</label>
                                    </div>
                                </form>
                            </td>
                        </tr>)
                    }
                    </tbody>
                    </thead>
                </table>
                :
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
        </div>
    )
}

export default Clients;