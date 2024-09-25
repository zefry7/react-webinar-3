import React, { memo, useEffect, useState } from "react";
import "./style.css"

function Pagination({ page, changePage, maxPage }) {
    let [mass, setMass] = useState(["1", "2", "3", "...", `${maxPage}`])

    useEffect(() => {
        switch (page) {
            case 1:
            case 2: {
                setMass(["1", "2", "3", "...", `${maxPage}`])
                break
            }
            case 3: {
                setMass(["1", "2", "3", "4", "...", `${maxPage}`])
                break
            }
            case maxPage:
            case (maxPage - 1): {
                setMass(["1", "...", `${maxPage - 2}`, `${maxPage - 1}`, `${maxPage}`])
                break
            }
            case (maxPage - 2): {
                setMass(["1", "...", `${maxPage - 3}`, `${maxPage - 2}`, `${maxPage - 1}`, `${maxPage}`])
                break
            }
            default: {
                setMass(["1", "...", `${page - 1}`, `${page}`, `${page + 1}`, "...", `${maxPage}`])
                break
            }
        }
    }, [page, maxPage])

    return <div className="Pagination">
        <div className="Pagination-content">
            {mass.map((v, i) => {
                if (v == "...") {
                    return <div className="Pagination-threeDots" key={i}>{v}</div>
                }
                if (v == page) {
                    return <div className="Pagination-number Pagination-number_active" key={i}>{v}</div>
                }
                return <div className="Pagination-number" onClick={() => changePage(Number(v))} key={i}>{v}</div>
            })}
        </div>
    </div>
}


export default memo(Pagination)