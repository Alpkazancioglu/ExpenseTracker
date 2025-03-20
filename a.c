int rmsValues[100] = 0;


void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef *hadc)
{     
      if (count > 100){
        count = 0;
      }    
      
      rmsValues[count] = adcValues[0];
      
}

int readADC_RMS() {
  uint32_t sum = 0;  // Karelerin toplamı
  int voltage = 0;
  for (int i = 0; i < 100; i++) {  // 100 örnek al
      
      
          
          voltage = map(rmsValues[i], 2423, 4095, -380, 380);  // ADC değerini voltaja çevir
          sum += voltage * voltage;  // Karesini al ve topla
      }
  }
  return  sqrt(sum / 100);  // RMS hesapla
}