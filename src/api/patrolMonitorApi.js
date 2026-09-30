import axios from "axios";

const API = "http://127.0.0.1:5001/api";

function getHeaders() {

    return {

        Authorization: `Bearer ${localStorage.getItem("token")}`

    };

}

export async function getPatrolDashboard() {

    const res = await axios.get(

        `${API}/patrol-monitor/dashboard`,

        {

            headers: getHeaders()

        }

    );

    return res.data;

}

export async function getLivePatrols(filters={}) {

    const res = await axios.get(

        `${API}/patrol-monitor/live`,

        {

            headers:getHeaders(),

            params:filters

        }

    );

    return res.data;

}

export async function getPatrolSession(id){

    const res=await axios.get(

        `${API}/patrol-monitor/session/${id}`,

        {

            headers:getHeaders()

        }

    );

    return res.data;

}

export async function getPatrolCheckpoints(id){

    const res=await axios.get(

        `${API}/patrol-monitor/checkpoints/${id}`,

        {

            headers:getHeaders()

        }

    );

    return res.data;

}

export async function getPatrolAuditLogs(id){

    const res=await axios.get(

        `${API}/patrol-monitor/audit/${id}`,

        {

            headers:getHeaders()

        }

    );

    return res.data;

}