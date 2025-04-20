import { ReactNode, useState } from "react"

import TabContext from '@mui/lab/TabContext'
import { Tab } from "@mui/material"

import { TabsContainer, TabListStyled } from "./styles"


type TabsProps = {
    labels: string[]
    children: ReactNode
}

export const Tabs = ({ labels, children }: TabsProps) => {
    const [value, setValue] = useState(1)

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <TabContext value={value}>
            <TabsContainer>
                <TabListStyled onChange={handleChange} aria-label="tabs">
                    {labels.map((label, index) => (
                        <Tab label={label} value={index + 1} key={index} />
                    ))}
                </TabListStyled>
            </TabsContainer>
            {children}
       </TabContext>
    )
}