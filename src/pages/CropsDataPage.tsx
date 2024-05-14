import React from 'react'
import TableComponent from '../components/TableComponent'
import { Container, Stack } from '@mantine/core';
import { data } from '../DataSet'
import SecondTableComponent from '../components/SecondTableComponent';

const CropsDataPage = () => {
    const CropPageProps = {
        mt: 'md',
        mb: 'md',
    };
    const RowOne = [
        {
            label: 'Year',
            name: 'year'
        },
        {
            label: 'Crop with Maximum Production in that Year',
            name: 'max_crop'
        },
        {
            label: 'Crop with Minimum Production in that Year',
            name: 'min_crop'
        }
    ]
    const RowTwo = [
        {
            label: 'Crop',
            name: 'crop'
        },
        {
            label: 'Average Yield of the Crop between 1950-2020',
            name: 'avg_yield'
        },
        {
            label: 'Average Cultivation Area of the Crop between 1950-2020',
            name: 'avg_cult'
        }
    ]

    const dataSet: { [key: string]: any }[] = data;

    // Method to extract unique dates from a dataset
    const uniqueDates = dataSet.reduce((acc: any, cur: any, index: any): any => {
        if (!acc[cur['Year']]) {
            acc[cur['Year']] = []
        }
        acc[cur['Year']]?.push({
            year: cur['Year'].split(',')[1].trim(),
            crop_name: cur['Crop Name'], crop_prod: cur['Crop Production (UOM:t(Tonnes))']
        })
        return acc
    }, []);
    
    // Aggregate crop data for each unique year, computing maximum and minimum crop productions.
    const aggregateData = Object.values(uniqueDates).map((item: any, index: any) => {
        const maxCrop = item.filter((i: any) => i.crop_prod !== '').reduce((acc: any, cur: any) => {
            return cur.crop_prod > acc.crop_prod ? cur : acc
        }, { crop_prod: 0 })
        const minCrop = item.filter((i: any) => i.crop_prod !== '').reduce((acc: any, cur: any) => {
            return cur.crop_prod > acc.crop_prod ? acc : cur
        }, {})
        return { max_crop: maxCrop.crop_name, min_crop: minCrop.crop_name, year: item[0].year }
    })

    // Method to extract unique crops from a dataset
    const uniqueCrops = dataSet.reduce((acc: any, cur: any, index: any): any => {
        if (!acc[cur['Crop Name']]) {
            acc[cur['Crop Name']] = []
        }
        acc[cur['Crop Name']]?.push({
            crop_name: cur['Crop Name'],
            crop_yield: cur['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'],
            crop_cult: cur['Area Under Cultivation (UOM:Ha(Hectares))']
        })
        return acc
    }, []);
    
    //Aggregate average crop yield and cultivation area for each unique crop
    const aggregateAverageData = Object.values(uniqueCrops).map((item: any, index: any) => {
        const sumYield = item.filter((i: any) => i.crop_yield !== '').reduce((acc: any, cur: any) => {
            return acc + cur.crop_yield
        }, 0)
        const sumCult = item.filter((i: any) => i.crop_cult !== '').reduce((acc: any, cur: any) => {
            return acc + cur.crop_cult
        }, 0)
        return { avg_yield: (sumYield / item.length).toFixed(3), avg_cult: (sumCult / item.length).toFixed(3),
         crop: item[0].crop_name }
    })

    return (
        <Container {...CropPageProps}>
            <Stack
                align="stretch"
                justify="center"
                gap="lg"
            >
                <TableComponent RowOne={RowOne} aggregateData={aggregateData} />
                <SecondTableComponent RowTwo={RowTwo} aggregateAverageData={aggregateAverageData} />
            </Stack>
        </Container>
    )
}

export default CropsDataPage