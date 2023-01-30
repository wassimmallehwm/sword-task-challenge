import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next';
import Dropdown from './Dropdown';

const Language = () => {
    const { i18n } = useTranslation();

    const formatLang = (lang: string): string => {
        let res: string = '';
        if (lang != undefined && lang != '') {
            if (lang.includes('-')) {
                res = lang.split('-')[0];
            } else {
                res = lang;
            }
        }
        return res.toUpperCase();
    }

    const selectedLang = (lang: string) => {
        return lang.toUpperCase() === formatLang(i18n.language)
    }

    const langs = [
        {
            id: 'en',
            label: 'English',
            active: selectedLang('en'),
            onAction: () => i18n.changeLanguage('en')
        },
        {
            id: 'fr',
            label: 'Français',
            active: selectedLang('fr'),
            onAction: () => i18n.changeLanguage('fr')
        }
    ]

    const trigger = (
        <>
            {formatLang(i18n.language)}
            <ChevronDownIcon
                className="w-4 h-4 ml-1 -mr-1 text-text_color"
                aria-hidden="true"/>
        </>
    )

    const displayComponent = (item: any) => (
        <span className="block w-full py-3 px-4"> {item.label} </span>
    )

    return (
        <Dropdown trigger={trigger} list={langs} small
        keyField="id" displayComponent={displayComponent} />
    )
}

export default Language;
