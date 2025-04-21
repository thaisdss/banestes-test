import { Skeleton } from "@mui/material"
import { PersonalDataContainer, TabsSkeletonContainer } from "./styles"

export const CustomerSkeleton = () => {
    return (
        <>
            <PersonalDataContainer>
                <Skeleton variant="circular" />
                <div>
                    <Skeleton variant="rectangular" />
                    <Skeleton variant="rectangular" />
                </div>
                <div>
                    <Skeleton variant="rectangular" />
                    <Skeleton variant="rectangular" />  
                </div>
            </PersonalDataContainer>
            <TabsSkeletonContainer>
                <Skeleton variant="rectangular" />
                <Skeleton variant="rectangular" />
            </TabsSkeletonContainer>
        </>
    )
}