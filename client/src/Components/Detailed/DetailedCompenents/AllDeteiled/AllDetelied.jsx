import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import AxiosCall, { BASE_URL } from '../../../AxiosCall/AxiosCall';
import { ThemeContext } from '../../../../context/GlobalContext';
import Loading2 from '../../../Loading/Loading2';
import { Stack } from "react-bootstrap";
import PaginationComponent from './Pagination';

const AllDetelied = () => {
    const ITEMS_PER_PAGE = 6;
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { lang } = useContext(ThemeContext)
    useEffect(() => {
        get()
    }, [id, currentPage])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToShow = data.slice(startIndex, endIndex);

    function get() {
        AxiosCall("get", `/content/${lang}/${id}/1`).then(data => {
            setTotalPages(data.pageCount)
            setData(data.contents)
            setLoading(false)
        })
    }
    const navigate = useNavigate()
    return (
        <section className='allDetelied'>
            <div className="Announcements-body">
                <div className="cards">

                    {
                        data &&
                            !loading ?
                            itemsToShow?.map((item, index) => {
                                const createdAt = new Date(item.created_at);
                                const formattedDate = `${createdAt.getMonth() + 1}.${createdAt.getDate()}.${createdAt.getFullYear()}`;
                                const formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
                                return (
                                    <div key={index} className="card-col" onClick={() => navigate(`/${item.title.replace(/\s+/g, '-').replace(/\//g, '-')}/${item.id}`)}>
                                        <div className="card-col-header">
                                            <div className="time-container">
                                                <span>{formattedDate} {formattedTime}</span>
                                            </div>
                                            <div className="viwers">
                                                <FontAwesomeIcon icon={faEye} />
                                                <span>{item.views}</span>
                                            </div>
                                        </div>
                                        <div className="card-col-body">
                                            <div className="title">
                                                {item.title}
                                            </div>
                                            <img className="image" alt="image" src={item.url == null ? 'https://archive.org/download/no-photo-available/no-photo-available.png' : BASE_URL + item.url} />
                                        </div>

                                    </div>

                                )
                            }
                            )
                            :
                            <div className="content-loading">
                                <Loading2 />
                            </div>
                    }
                </div>

                {
                    data.length > 0 && <Stack spacing={2}>
                        <PaginationComponent
                            totalPages={totalPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </Stack>
                }
            </div>
        </section >
    );
}

export default AllDetelied;
