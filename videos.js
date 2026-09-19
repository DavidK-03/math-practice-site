/* =====================================================================
   רשימת הסרטונים — זה הקובץ היחיד שצריך לערוך כדי להוסיף סרטונים.

   לכל נושא יש:
   - playlist: קישור לפלייליסט של הנושא (לא חובה). נפתח כשאין סרטונים ברשימה.
   - videos: רשימת סרטונים. האתר בוחר מהם סרטון אקראי.

   כל סרטון נכתב בשורה אחת, בצורה הזו:
     { title: 'פתרון משוואה ריבועית', url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', sub: 'משוואה ריבועית' },

   title — השם שיופיע על הכפתור (לא חובה).
   sub   — תת-נושא (לא חובה). אם הוא זהה לתת-הנושא של השאלה שבה הסטודנט טעה,
           האתר יעדיף את הסרטון הזה. שמות תתי-הנושאים מופיעים בהערה ליד כל נושא.

   שימו לב: פסיק בסוף כל שורה, ומרכאות בודדות סביב כל טקסט.
   נושא בלי סרטונים ובלי פלייליסט יפתח חיפוש ביוטיוב.
   ===================================================================== */

// הפלייליסט הכללי — מופיע בחלון "קראו על הנושא" בכל הנושאים
const MAIN_PLAYLIST = 'https://www.youtube.com/playlist?list=PLGb-WD5Eeru0';

const VIDEOS = {
  // משוואות — תתי-נושאים: משוואה לינארית, מערכת משוואות, משוואה עם שברים, ערך מוחלט, אי-שוויון לינארי,
  // משוואה דו-ריבועית, בעיה מילולית, משוואה עם פרמטר, משוואה מודולו p, מערכת בשלושה נעלמים, אי-שוויון עם ערך מוחלט
  eq: {
    playlist: 'https://youtube.com/playlist?list=PLCvkcH5OUmCnT8S2bkqFS6FOQZbGs9jCm&si=zX6PJGn1T-xJL4qT',
    videos: [
      // { title: '', url: '', sub: '' }
      {title: 'סרטון על משוואה לינארית', url: 'https://youtu.be/8lyC2Rm3IjU?si=fd57XFTB3o5cOpzv', sub: 'משוואה לינארית'},
      {title: 'סרטון על משוואה עם שברים', url: 'https://youtu.be/8lyC2Rm3IjU?si=fd57XFTB3o5cOpzv', sub: 'משוואה עם שברים'},
      {title: 'סרטון על אי-שוויון לינארי', url: 'https://youtu.be/pM-upeArQrc?si=j0BoPW9ybp23I_lo', sub: 'אי-שוויון לינארי'},
      {title: 'סרטון על משוואה דו-ריבועית', url: 'https://youtu.be/3Qc2gdQfCMU?si=x8Dz4xdwmk37nNcf', sub: 'משוואה דו-ריבועית'},
      {title: 'סרטון על משוואה עם פרמטר', url: 'https://youtu.be/_r6QZZHi5jU?si=duQPyuXJsQSAhjmV', sub: 'משוואה עם פרמטר'},
      {title: 'סרטון על משוואה מודולו p', url: 'https://youtu.be/G3w-VXmYvIE?si=SFqXfPsToLtJ7gZ6', sub: 'משוואה מודולו p'},
      {title: 'סרטון על מערכת בשלושה נעלמים', url: 'https://youtu.be/CuRBwYofqwA?si=Lja_lwP82dOoCyrw', sub: 'מערכת בשלושה נעלמים'},
      {title: 'סרטון על אי-שוויון עם ערך מוחלט', url: 'https://youtu.be/sgWY6F1ud9U?si=E-XbNAhOJ1Bln_vi', sub: 'אי-שוויון עם ערך מוחלט'},
      {title: 'סרטון על אי-שוויון עם ערך מוחלט', url: 'https://youtu.be/0MYtsX-uo9c?si=DS_k6kS7jThPvxbJ', sub: 'אי-שוויון עם ערך מוחלט'}
    ],
  },

  // פונקציות — הצבה בפונקציה, הרכבת פונקציות, תחום הגדרה, תמונה (טווח), פונקציה הפוכה, זוגיות,
  // הזזות של גרפים, חד-חד-ערכיות, הפיכות בתחום מוגבל
  fn: {
    playlist: 'https://www.youtube.com/playlist?list=PLGb-WD5Eeru0',
    videos: [ 
      {title: 'סרטון על תחום הגדרה', url: 'https://youtu.be/rY4buhtBqHI?si=Wyom0rrUYJ-Akpa7', sub: 'תחום הגדרה'},
      {title: 'סרטון על תחום הגדרה', url: 'https://youtu.be/RScmR1GO_RI?si=_1z30_U-3cZ04OTr', sub: 'תחום הגדרה'},
      {title: 'סרטון על מקור ותמונה', url: 'https://youtu.be/LWLq3IveweA?si=ySOFbvnQnvBi49Bb', sub: 'תמונה (טווח)'},
      {title: 'סרטון על מקור ותמונה', url: 'https://youtu.be/9oIp_7apY30?si=QLJjpI8cY7MRn9NO', sub: 'תמונה (טווח)'},
      {title: 'סרטון על פונקציה הפוכה', url: 'https://youtu.be/pbB92sITZL8?si=igDLjkkaEPPLhGgZ', sub: 'פונקציה הפוכה'},
      {title: 'סרטון על זוגיות', url: 'https://youtu.be/aEowmVIomzw?si=7ptZI8x2uwsBGTgI', sub: 'זוגיות'},
      {title: 'סרטון על זוגיות', url: 'https://youtu.be/Oiw6Uu2h_e8?si=uAfUPjTI10fH8AIJ', sub: 'זוגיות'},
      {title: 'סרטון על הזזות של גרפים', url: 'https://youtu.be/1SoCOcAwMpg?si=LGV4Qqu-Fb-DjAN7', sub: 'הזזות של גרפים'},
      {title: 'סרטון על הזזות של גרפים', url: 'https://youtu.be/RJrdZ1Kz1xM?si=AeBZnqSH4Soz_aZh', sub: 'הזזות של גרפים'},
      {title: 'סרטון על חד-חד-ערכיות', url: 'https://youtu.be/d4IjSnhKk04?si=8Xde1tFTOJ-aEM6N', sub: 'חד-חד-ערכיות'},
      {title: 'סרטון על הרכבה של פונקציות', url: 'https://youtu.be/cAgroJMjqLQ?si=pZrcC-uDAuSM-jpx', sub: 'הרכבת פונקציות'},
    ],
  },

  // לינאריות, ריבועיות ופולינומים — שיפוע ישר, משוואה ריבועית, פירוק לגורמים, קודקוד פרבולה, דיסקרימיננטה,
  // משפט השארית, חילוק פולינומים, אי-שוויון ריבועי, נוסחאות וייטה, פולינומים מעל שדה סופי, שורשים של פולינום ממעלה 3
  poly: {
    playlist: 'https://www.youtube.com/playlist?list=PLW3u28VuDAHKQ0Bq70HmgY67n4eEGMih5',
    videos: [ {title: 'סרטון על מציאת קודקוד פרבולה', url: 'https://www.youtube.com/watch?v=BgtzwPPHdKY', sub: 'קודקוד פרבולה'},
      { title: 'משוואה ריבועית', url: 'https://www.youtube.com/watch?v=vVjttoNGnPY', sub: 'משוואה ריבועית' },
      { title: 'נוסחת השורשים', url: 'https://www.youtube.com/watch?v=7VrhvPCZ2oM', sub: 'משוואה ריבועית' },
      { title: 'השלמה לריבוע', url: 'https://www.youtube.com/watch?v=ipD8ZNyTl_Y', sub: 'קודקוד פרבולה' },
      { title: 'הגרף של פונקציה ריבועית', url: 'https://www.youtube.com/watch?v=omQK2xnXbRo', sub: 'קודקוד פרבולה' },
      { title: 'מציאת משוואה עם שורשים נתונים', url: 'https://www.youtube.com/watch?v=j75J1KKx7sY', sub: 'נוסחאות וייטה' },
      { title: 'אי-שוויונות ריבועיים', url: 'https://www.youtube.com/watch?v=oDLC8G-Ka98', sub: 'אי-שוויון ריבועי' },
    ],
  },

  // שורשים, מעריכיות ולוגריתמים — חוקי חזקות, משוואה מעריכית, חישוב לוגריתמים, חוקי לוגריתמים, פישוט שורשים,
  // משוואה לוגריתמית, משוואה מעריכית עם הצבה, לוגריתם בבסיס חזקה, אי-שוויון רציונלי, החלפת בסיס
  exp: {
    playlist: 'https://www.youtube.com/playlist?list=PLW3u28VuDAHJKcDApeFRhE4oFOQ2QUFMk',
    videos: [
      { title: 'המעריך בתפקיד המשתנה', url: 'https://www.youtube.com/watch?v=-kfLSWzMeII', sub: 'משוואה מעריכית' },
      { title: 'פונקציות מעריכיות', url: 'https://www.youtube.com/watch?v=tYsV-tk7iJI', sub: 'משוואה מעריכית' },
      { title: 'פונקציות לוגריתמיות', url: 'https://www.youtube.com/watch?v=IdCCoVPrZU4', sub: 'חישוב לוגריתמים' },
      { title: 'הוכחות של כללי לוגריתמים', url: 'https://www.youtube.com/watch?v=ym5BkNYUVJg', sub: 'חוקי לוגריתמים' },
      { title: 'שימוש בכללי לוגריתמים', url: 'https://www.youtube.com/watch?v=KJYBBvHVFGk', sub: 'חוקי לוגריתמים' },
      { title: 'עוד שימוש בכללי לוגריתמים', url: 'https://www.youtube.com/watch?v=-CvYvIRFDks', sub: 'חוקי לוגריתמים' },
    ],
  },

  // טריגונומטריה — ערכים מדויקים, מעלות ורדיאנים, מחזוריות, זהויות, משוואות טריגונומטריות, זווית כפולה,
  // סכום והפרש זוויות, טנגנס, פתרון כללי, אי-שוויון טריגונומטרי
  trig: {
    playlist: 'https://www.youtube.com/playlist?list=PLW3u28VuDAHKgGIEuxcWgNECq7sb9bIkD',
    videos: [
      { title: 'מבוא לטריגונומטריה', url: 'https://www.youtube.com/watch?v=RV1UQuLXxMg' },
      { title: 'זהויות טריגונומטריות', url: 'https://www.youtube.com/watch?v=tLOvb9CTI9A', sub: 'זהויות' },
    ],
  },

  // וקטורים — פעולות על וקטורים, אורך וקטור, מכפלה סקלרית, וקטור בין נקודות, ניצבות, וקטור יחידה,
  // זווית בין וקטורים, צירוף לינארי, מכפלה וקטורית, תלות לינארית
  vec: {
    playlist: 'https://www.youtube.com/playlist?list=PLW3u28VuDAHLxBWDKAnzIdj0Nvl7VV7ly',
    videos: [ {title: 'סרטון על תלות לינארית', url: 'https://www.youtube.com/watch?v=7xoVNM3OX2A', sub: 'תלות לינארית'}, 
      {title: 'סרטון על וקטורים', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs'},
      {title: 'סרטון על מכפלה וקטורית', url: 'https://youtu.be/eu6i7WJeinw?si=efkUvrZrpOWVrsyV', sub: 'מכפלה וקטורית'},
      { title: 'מושג הווקטור', url: 'https://www.youtube.com/watch?v=4XjkQqgNIyo' },
      { title: 'הפרש וקטורים', url: 'https://www.youtube.com/watch?v=kW6zvVmb38k', sub: 'פעולות על וקטורים' },
      { title: 'חיבור וקטורים לפי רכיבים', url: 'https://www.youtube.com/watch?v=ZKS4hDBJxGk', sub: 'פעולות על וקטורים' },
      { title: 'מכפלה סקלרית', url: 'https://www.youtube.com/watch?v=wbmmEuh2npo', sub: 'מכפלה סקלרית' },
      { title: 'תכונות מכפלה סקלרית', url: 'https://www.youtube.com/watch?v=lVhCbjmpkN8', sub: 'מכפלה סקלרית' },
      { title: 'מכפלה סקלרית ברכיבים', url: 'https://www.youtube.com/watch?v=kc9zJ75lt3k', sub: 'מכפלה סקלרית' },
    ],
  },

  // גאומטריה אנליטית — מרחק בין נקודות, אמצע קטע, משוואת ישר, ישרים מאונכים, מעגל, חיתוך ישרים, אליפסה,
  // מרחק נקודה מישר, משיק למעגל, מקום גאומטרי
  geo: {
    playlist: 'https://www.youtube.com/playlist?list=PLW3u28VuDAHI5ejLWzT18GtgpxEu7cje1',
    videos: [
      { title: 'מבוא לגאומטריה אנליטית', url: 'https://www.youtube.com/watch?v=Itx7xxzuaAk' },
      { title: 'המעגל', url: 'https://www.youtube.com/watch?v=XKNxrW6ntv8', sub: 'מעגל' },
      { title: 'אליפסה', url: 'https://www.youtube.com/watch?v=1KvKtwjJFZI', sub: 'אליפסה' },
      { title: 'משוואת האליפסה - המשך', url: 'https://www.youtube.com/watch?v=iKGc3Rpdc8M', sub: 'אליפסה' },
    ],
  },

  // מספרים מרוכבים — כפל מרוכבים, ערך מוחלט, חזקות של i, כפל ב-i, חילוק מרוכבים, ריבוע של מרוכב,
  // משוואה עם צמוד, דה-מואבר, משוואה ריבועית מרוכבת, הצגה קוטבית, שורשי מרוכבים
  cx: {
    playlist: 'https://youtube.com/playlist?list=PLCvkcH5OUmCkrVRKwZTbp-48dL-Oe-qAy&si=YUB7szh2BmUna151',
    videos: [
       { title: 'מבוא למספרים מרוכבים', url: 'https://www.youtube.com/watch?v=d7BcKDKthSU' },
      { title: 'צמוד של מספר מרוכב', url: 'https://www.youtube.com/watch?v=i18CaNi36oo', sub: 'משוואה עם צמוד' },
      { title: 'מודול של סכום ושל מכפלה', url: 'https://www.youtube.com/watch?v=lM1Lbnqtewk', sub: 'ערך מוחלט' },
      { title: 'מודול של מנה', url: 'https://www.youtube.com/watch?v=tsCMMg-2R6k', sub: 'ערך מוחלט' },
      { title: 'חילוק מספרים מרוכבים', url: 'https://www.youtube.com/watch?v=gWlgkmjMTxk', sub: 'חילוק מרוכבים' },
      { title: 'הופכי של מספר מרוכב', url: 'https://www.youtube.com/watch?v=OA3WGHr0kWM', sub: 'חילוק מרוכבים' },
      { title: 'מעבר בין הצגה אלגברית וטריגונומטרית', url: 'https://www.youtube.com/watch?v=hDcOPrnSI3c', sub: 'הצגה קוטבית' },
      { title: 'כפל בהצגה טריגונומטרית', url: 'https://www.youtube.com/watch?v=MhJbmHIxEJg', sub: 'דה-מואבר' },
    ],
  },

  // גבולות, רציפות ונגזרות — גבול באינסוף, נגזרת של פולינום, גבול בהצבה, גבול מסוג 0/0, כלל השרשרת,
  // משוואת משיק, נגזרת של מנה, כלל המכפלה, גבול טריגונומטרי, הגדרת הנגזרת, גבול של e, רציפות, גבולות חד-צדדיים
  lim: {
    playlist: 'https://www.youtube.com/playlist?list=PLW3u28VuDAHKr76iVkXSWIlGqQJwfGgCa',
    videos: [
      { title: 'חישוב גבולות', url: 'https://www.youtube.com/watch?v=SYxC6aN2SCw', sub: 'גבול מסוג 0/0' },
      { title: 'הגדרת הנגזרת', url: 'https://www.youtube.com/watch?v=1DItBD00CRY', sub: 'הגדרת הנגזרת' },
      { title: 'חישוב נגזרת לפי ההגדרה', url: 'https://www.youtube.com/watch?v=-WUyAgGtn20', sub: 'הגדרת הנגזרת' },
      { title: 'רשימת נגזרות שימושיות', url: 'https://www.youtube.com/watch?v=oquDJ_JgUDI', sub: 'נגזרת של פולינום' },
      { title: 'הוכחת נגזרת של מנה', url: 'https://www.youtube.com/watch?v=A5HNzLIkzKI', sub: 'נגזרת של מנה' },
      { title: 'כלל השרשרת - נגזרת של הרכבה', url: 'https://www.youtube.com/watch?v=et6MxvaURg8', sub: 'כלל השרשרת' },
    ],
  },

  // חקירת פונקציות — תחומי עלייה וירידה, נקודות קיצון, אסימפטוטות, נקודת פיתול, קיצון עם אקספוננט,
  // אסימפטוטה של לוגריתם, מספר פתרונות, קיצון בקטע סגור, בעיית קיצון, קיצון לפי נגזרת
  crv: {
    playlist: 'https://www.youtube.com/playlist?list=PLCvkcH5OUmCmk4X4O7tsN1gZ3jvRXczVu',
    videos: [
       { title: 'מבוא לחקירת פונקציות', url: 'https://www.youtube.com/watch?v=ElbMqOxINBI' },
      { title: 'מיון נקודות חשודות כקיצון', url: 'https://www.youtube.com/watch?v=DAleeqpAle8', sub: 'נקודות קיצון' },
      { title: 'קמירות וקעירות', url: 'https://www.youtube.com/watch?v=HxWcLxGzq2w', sub: 'נקודת פיתול' },
      { title: 'מציאת נקודות פיתול', url: 'https://www.youtube.com/watch?v=6I31njOlZlQ', sub: 'נקודת פיתול' },
      { title: 'אסימפטוטה אופקית', url: 'https://www.youtube.com/watch?v=ze5WstgBZL0', sub: 'אסימפטוטות' },
      { title: 'גבולות אינסופיים', url: 'https://www.youtube.com/watch?v=uiBNm55GOTk', sub: 'אסימפטוטות' },
    ],
  },

  // אינטגרלים — אינטגרל לא מסוים, אינטגרל מסוים, אינטגרלים מיידיים, שטח בין גרפים, שיטת ההצבה,
  // סימטריה באינטגרל, אינטגרל שנותן ln, אינטגרציה בחלקים, אינטגרל לא אמיתי, המשפט היסודי, סכומי רימן
  int: {
    playlist: 'https://youtube.com/playlist?list=PLCvkcH5OUmClUwahw9IEjCcXNcPDvSS2a&si=2JGOgiWpzmcjWaK8',
    videos: [ {title: 'סרטון על אינטגרל לא מסוים', url: 'https://youtu.be/rfG8ce4nNh0?si=eNg_ZTXqxa1HzzcN', sub: 'אינטגרל לא מסוים'},
      {title: 'סרטון על אינטגרל לא מסוים', url: 'https://youtu.be/E_WPYaESkFk?si=u0oP7aDiLW7eCyQO', sub: 'אינטגרל לא מסוים'},
      {title: 'סרטון על אינטגרל מסוים', url: 'https://youtu.be/fzDxAdLqPMs?si=Eq8dG55a75ED4Jcc', sub: 'אינטגרל מסוים'},
      {title: 'סרטון על אינטגרל מסוים', url: 'https://youtu.be/Zixs6yUUwpg?si=YaRZQ4mhb1I1Lj2f', sub: 'אינטגרל מסוים'},
      {title: 'סרטון על אינטגרלים מיידיים', url: 'https://youtu.be/k2Zf8TFDUDQ?si=pxeL-jcBRAjXYlqz', sub: 'אינטגרלים מיידיים'},
      {title: 'סרטון על שטח בין גרפים', url: 'https://youtu.be/Zixs6yUUwpg?si=JvV5IStvDdru57Nh', sub: 'שטח בין גרפים'},
      {title: 'סרטון על שטח בין גרפים', url: 'https://youtu.be/q6ySDTheHV0?si=CbL7Y7Nd4ioN0BYY', sub: 'שטח בין גרפים'},
      {title: 'סרטון על שטח בין גרפים', url: 'https://youtu.be/q6ySDTheHV0?si=LkYBEOm-q6mAZoNz', sub: 'שטח בין גרפים'},
      {title: 'סרטון על שיטת ההצבה', url: 'https://youtu.be/8mvieahAH-s?si=k6kGy4alIQEIWu3Z', sub: 'שיטת ההצבה'},
      {title: 'סרטון על שיטת ההצבה', url: 'https://youtu.be/dDVplfOmlOw?si=JiqlXZIoZ68bv9eL', sub: 'שיטת ההצבה'},
      {title: 'סרטון על שיטת ההצבה', url: 'https://youtu.be/FDQKdTtht94?si=F3PRcD4J9INio9AD', sub: 'שיטת ההצבה'},
      {title: 'סרטון על שיטת ההצבה', url: 'https://youtu.be/iPTqklRq-ek?si=xtpQUWuBTMh9wUb9', sub: 'שיטת ההצבה'},
      {title: 'סרטון על אינטגרציה בחלקים', url: 'https://youtu.be/xKPP9coaUCc?si=a1H1zgu09lWaF_rX', sub: 'אינטגרציה בחלקים'},
      {title: 'סרטון על אינטגרציה בחלקים', url: 'https://youtu.be/5jC3xX4D5e8?si=yL_2Z7MIgeLwmxFr', sub: 'אינטגרציה בחלקים'},
      {title: 'סרטון על אינטגרציה בחלקים', url: 'https://youtu.be/hrLKM83fnWU?si=Uwad14iRagU0D1E3', sub: 'אינטגרציה בחלקים'},
      {title: 'סרטון על אינטגרל לא אמיתי', url: 'https://youtube.com/playlist?list=PLHinTfsAOC-shDv-mM3mDVkxtOSD8qabz&si=3Z1fPievBIEZG732', sub: 'אינטגרל לא אמיתי'},
      {title: 'סרטון על המשפט היסודי', url: 'https://youtu.be/oN4RYy-a3hk?si=f4liEBjT18jhk64y', sub: 'המשפט היסודי'},
      {title: 'סרטון על המשפט היסודי', url: 'https://youtu.be/eNes1e9lcvk?si=RKipALLKJt9UdTRO', sub: 'המשפט היסודי'},
      {title: 'סרטון על המשפט היסודי', url: 'https://youtu.be/rgiT_F1QRK8?si=QiVXXC7RmBsbDRYv', sub: 'המשפט היסודי'},
      {title: 'סרטון על סכומי רימן', url: 'https://youtu.be/wYbQTNZOrII?si=i0tvhCAi_vc4AZqO', sub: 'סכומי רימן'}
    ],
  },

  // סדרות ואינדוקציה — סדרה חשבונית, סכום סדרה חשבונית, סדרה הנדסית, טור הנדסי אינסופי, אינדוקציה,
  // נוסחת נסיגה, סופרמום ואינפימום, גבול של סדרה, גבול של סדרת נסיגה, טור טלסקופי
  seq: {
    playlist: '',
    videos: [ {title: 'סרטון על סדרה חשבונית', url: 'https://www.youtube.com/watch?v=I5xQnpFg1ns' , sub: 'סדרה חשבונית'}, 
      {title: 'סכום סדרה חשבונית', url: 'https://youtu.be/pxyfUJwurvs?si=Bh2xvYMBx277Joha' , sub: 'סכום סדרה חשבונית'},
      {title: 'סרטון על סדרה הנדסית', url: 'https://youtu.be/6o6wS9VprWQ?si=CSq0l18KRT1g_xVq' , sub: 'סדרה הנדסית'},
      {title: 'סרטון על טור הנדסי אינסופי', url: 'https://youtu.be/2YfTiLY6B5s?si=PcJQ3aW52bGMXPrx' , sub: 'טור הנדסי אינסופי'},
      {title: 'סרטון על אינדוקציה', url: 'https://youtu.be/WT-_JVgWjzY?si=0QSqS9IDhVX1dStC' , sub: 'אינדוקציה'},
      {title: 'סרטון על אינדוקציה', url: 'https://youtu.be/6COG1ujs0ew?si=Pp6wrApSDXTJ1iGz' , sub: 'אינדוקציה'},
      {title: 'סרטון על אינדוקציה', url: 'https://youtu.be/6kFOIEKRvK8?si=pdXwzlyU8UF57dOx' , sub: 'אינדוקציה'},
      {title: 'סרטון על נוסחת נסיגה', url: 'https://youtu.be/9f5rYCS3jjg?si=G8jnLB3NSKoED0XM' , sub: 'נוסחת נסיגה'},
      {title: 'סרטון על סופרמום ואינפימום', url: 'https://youtu.be/WdKqIf8xGeY?si=_GyXAPk-Jp0C-LEi' , sub: 'סופרמום ואינפימום'},
      {title: 'סרטון על גבול של סדרה', url: 'https://youtu.be/yKkxy7HcImM?si=fNSah2jdqofgf0B6' , sub: 'גבול של סדרה'},
      {title: 'סרטון על גבול של סדרה', url: 'https://youtu.be/0cO74p0uMyg?si=h_0uYz3O3nUbgrQr' , sub: 'גבול של סדרה'},
      {title: 'סרטון על גבול של סדרת נסיגה', url: 'https://youtu.be/0u-6eDVjKeA?si=uQpYMY9oOOCIvKWF&t=279' , sub: 'גבול של סדרת נסיגה'},
      {title: 'סרטון על טור טלסקופי', url: 'https://youtu.be/uZHNxYO7S-Q?si=SgABEi2ZA1mN2MuI' , sub: 'טור טלסקופי'},
    ],
  },
};
