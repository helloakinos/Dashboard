import React from 'react'
import styles from "./RowsData.module.css"

const RowsData = ({reportDataRow}) => {

  return reportDataRow.map(({id, Block,PredictedYield_old,PredictedYield_new,StemDensityMetre_old,StemDensityMetre_new,PredictedHarvestDate_old,PredictedHarvestDate_new,GrowthStage})=>(
      
    <div key={id} className={`flex justify-between ${styles.reportRow} filterDiv {GrowthStage}`}>
        <span className={`pl-1 ${styles.blockWidth} ${styles.reportFontSize}`}>{Block}</span>
        <div className={`${styles.predictedYieldWidth}  flex`}><span className={` ${styles.displayData} ${styles.displayDataWidth}`}>{PredictedYield_new} Stems </span><span className={`${PredictedYield_new>PredictedYield_old ? styles.increase:styles.decrease}`}>{PredictedYield_new>PredictedYield_old ?<i className='bx bx-up-arrow-alt'></i>:<i className='bx bx-down-arrow-alt'></i>}{Math.round(Math.abs((PredictedYield_new-PredictedYield_old)/PredictedYield_old*100))}%</span></div>
        <div className={`${styles.stemDensityWidth} flex`}><span className={`${styles.displayData} ${styles.displayDataWidth}`}>{StemDensityMetre_new} Stems/m </span><span className={`${StemDensityMetre_new>StemDensityMetre_old ? styles.increase:styles.decrease}`}>{StemDensityMetre_new>StemDensityMetre_old ?<i className='bx bx-up-arrow-alt'></i>:<i className='bx bx-down-arrow-alt'></i>}{Math.round(Math.abs((StemDensityMetre_new-StemDensityMetre_old)/StemDensityMetre_old*100))}%</span></div>
        <div className={`${styles.PredictedHarvestDateWidth} flex`}><span className={` ${styles.displayData} ${styles.displayDataWidth2}`}>{PredictedHarvestDate_new}</span> <span className={`${new Date(PredictedHarvestDate_new)> new Date(PredictedHarvestDate_old)? styles.increase:styles.decrease}`}>{new Date(PredictedHarvestDate_new)>new Date(PredictedHarvestDate_old)?<i className='bx bx-up-arrow-alt'></i>:<i className='bx bx-down-arrow-alt'></i>}{Math.abs((new Date(PredictedHarvestDate_new)-new Date(PredictedHarvestDate_old)))/(1000*3600*24)} days</span></div>
        <span className={styles.growthStageWidth}>Stage {GrowthStage}</span>
        <div className={`${styles.actionsWidth} flex justify-between`}><a href="/">Show Data </a><i className='bx bx-dots-vertical-rounded' ></i></div>
    </div>))

}

export default RowsData;
