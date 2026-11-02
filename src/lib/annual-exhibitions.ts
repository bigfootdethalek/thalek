import shows2018 from '@/content/exhibitions/2018.json';
import shows2019 from '@/content/exhibitions/2019.json';
import shows2020 from '@/content/exhibitions/2020.json';
import shows2021 from '@/content/exhibitions/2021.json';
import shows2022 from '@/content/exhibitions/2022.json';
import shows2023 from '@/content/exhibitions/2023.json';
import shows2024 from '@/content/exhibitions/2024.json';
import shows2025 from '@/content/exhibitions/2025.json';
import type { Exhibition } from './exhibitions';

export const annualExhibitions: Record<string, Exhibition[]> = {
  '2018': shows2018,
  '2019': shows2019,
  '2020': shows2020,
  '2021': shows2021,
  '2022': shows2022,
  '2023': shows2023,
  '2024': shows2024,
  '2025': shows2025,
};