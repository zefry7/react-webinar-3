import React, { memo, useEffect, useState } from "react";
import List from "../list";
import { useOutletContext } from "react-router-dom";
import Pagination from "../pagination";
import "./style.css"

function WrapperList({ pageList, renderItem, page, maxPage, changePage}) {
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (maxPage > 0) {
            setLoader(true)
        }
    }, [maxPage])

    return <>
        {loader == true
            ? <>
                <List list={pageList} renderItem={renderItem} />
                <Pagination page={page} changePage={changePage} maxPage={maxPage} />
            </>
            : <p className="WrapperList-loader">Загрузка...</p>
        }
    </>
}

export default memo(WrapperList)