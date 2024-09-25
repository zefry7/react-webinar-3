import React, { memo, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import "./style.css"
import { changeLangText } from "../../utils";

function Description({ addToBasket, lang, item }) {
    const cn = bem('Description');

    return <div className={cn()}>
        <p className={cn("text")}>{item?.description}</p>
        <p className={cn("text")}>
            {changeLangText(lang, "textMadeIn")}: <span>{item?.madeIn?.title} ({item?.madeIn?.code})</span>
        </p>
        <p className={cn("text")}>
            {changeLangText(lang, "textCategory")}: <span>{item?.category?.title}</span>
        </p>
        <p className={cn("text")}>
            {changeLangText(lang, "yearRelease")}: <span>{item?.edition}</span>
        </p>
        <p className={cn("price")}>
            {changeLangText(lang, 'textPrice')}: {item?.price} ₽
        </p>
        <div className={cn('button')}>
            <button onClick={() => addToBasket(item?._id)}>{changeLangText(lang, "buttonList")}</button>
        </div>
    </div>
}

export default memo(Description);