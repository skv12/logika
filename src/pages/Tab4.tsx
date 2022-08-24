import React, { useState } from 'react';
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonText, IonCol, IonRow, IonList, IonIcon
  , IonButton, IonAlert, IonLoading, IonGrid, IonCard, IonCardHeader, IonListHeader, IonLabel, IonDatetime } from '@ionic/react';
import './Tab3.css';
import { Store, SERV, d_type, getDist} from './Store'
import {ellipsisHorizontalOutline, searchOutline } from 'ionicons/icons';

function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;

  return yy + '-' + mm + '-' + dd;
}

const Tab4: React.FC = () => {

  const [search, setSearch] = useState(false);  
  const [loading, setLoading] = useState(false);
  const [dist, setDist] = useState<d_type>();
  const [alert, setAlert] = useState(false)
  const [value, setValue] = useState<string>(formatDate(new Date()))

  function        SStatus(data){
    setLoading(true)
    let user = Store.getState().user
    if(dist === undefined) return;
    let params = {
      params:{Тип: data, Номер: dist.Номер}
    }

    axios.get(
        SERV() + "СтатусДоставки"
        ,{
          auth: {
            username: unescape(encodeURIComponent(user.user)),
            password: unescape(encodeURIComponent(user.password))
          },
          params
        } 
      ).then(response => response.data)
      .then((data) => {
          if(dist.Состояние === "Доставлено" && params.params.Тип === "Доставлено"){
            dist.Состояние = "Отправлено"
          } else dist.Состояние = params.params.Тип;
          setDist(dist)
          setLoading(false)
          return true
      }).catch(error => {
        console.log(error)
        setLoading(false)
        return false
      })

  }

  function        Dist(props:{info: Array<d_type>}):JSX.Element{

    let elem = <></>
    let info = props.info;
    if(info.length > 0){
      for(let i = 0;i < info.length;i++){
        
        elem = <>
          {elem}
          <IonItem class="f-1" onClick={()=>{
              setDist(info[i])
          }}>
            <IonGrid>
              <IonRow>
                  <IonCol size="4">
                    <IonRow>
                        {info[i].Номер}
                    </IonRow>  
                    <IonRow>
                        {info[i].Дата}
                    </IonRow>  
                  </IonCol>  
                  <IonCol size="8" class="f-2">
                    <IonText class="a-margin">{info[i].Состояние}</IonText>
                  </IonCol>
              </IonRow>
              <IonRow id="t-line">
                <IonText>{info[i].Адрес}</IonText>
              </IonRow>
            </IonGrid>
          </IonItem>
        </>
      } elem = <IonList>
          {elem}
      </IonList>
    }


    return elem
  }

  async function  Search(){

    setLoading(true);
    let res = await getDist({params: {Дата: value}})
  
    if(res) setLoading(false)
    else setLoading(false)

  } 
  
 function         DItem(props:{info}):JSX.Element {
  let elem = <></>
  let info = props.info;
  info.forEach(i => {
    elem = <>
      { elem }
      <IonItem class = "f-1">
            <IonText> { i.Номенклатура }</IonText>
          <IonCol size = "2" slot="end">
            <IonLabel> { i.КОтгрузке } </IonLabel>
          </IonCol>
      </IonItem>
    </>
  });

  return elem;
 } 

  function        DCard(props:{info: d_type}): JSX.Element {
     let elem = <></>
      let info = props.info;
     elem = <>
        <IonButton fill="clear" onClick={()=>{
          setDist(undefined)
        }}>
          <IonIcon slot="icon-only" icon={ellipsisHorizontalOutline}></IonIcon>
        </IonButton>
        <IonCard>
          <IonCardHeader>{info.Номер}</IonCardHeader>
          <IonGrid>
              <IonRow>
                <IonCol size="4">Дата:</IonCol>
                <IonCol>{info.Дата}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4"> Время c:</IonCol>
                <IonCol>{info.ВремяС}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">Время по:</IonCol>
                <IonCol>{info.ВремяПо}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">Адрес:</IonCol>
                <IonCol>{info.Адрес}</IonCol>
              </IonRow>
              <IonList>
                <IonListHeader> Товары к доставке </IonListHeader>
                <DItem info={info.Данные} />
              </IonList>
              <IonRow>
                <IonCol size="4">Состояние:</IonCol>
                <IonCol>
                  <IonButton fill="clear" onClick={()=>{ setAlert(true)}}>
                      {info.Состояние}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
        </IonCard>
      </>
     return elem
  }

  function        Distant():JSX.Element{
    let elem = <></>

    if(dist === undefined)
      elem = <Dist info={Store.getState().dist} />
    else 
      elem = <DCard info={dist} />
    return elem
  }

  return (
    <IonPage>
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle class = "a-center">Доставки</IonTitle>
          {/* <IonButton slot="end" fill="clear" onClick={()=>{
                Search()
            }}>
              <IonIcon slot="icon-only" icon = {syncOutline}></IonIcon>
            </IonButton>           */}
          </IonToolbar>   
        </IonHeader>
        <IonItem>
          <IonLabel position="stacked">Поиск</IonLabel>
          <IonDatetime displayFormat="YYYY-MM-DD" placeholder="Дата" value = {value}
              onIonChange={e => {
                let st = (e.detail.value as string);
                setValue(st)      
              }}>         
          </IonDatetime>
          <IonButton fill="clear" slot="end" expand="block" onClick={()=>{
              Search();         
          }}>
            <IonIcon slot="icon-only" icon={searchOutline} /> 
          </IonButton>
      </IonItem>
      <IonContent>
          <Distant />
      </IonContent>

      {/* Поиск */}
      <IonAlert 
            isOpen={search}
            onDidDismiss={() => setSearch(false)}
            header={'Период'}
            message={'Поиск чеков с указанной даты вниз'}
            inputs={[
              {
                name: 'Дата',
                type: 'date',
                placeholder: 'Дата'
              },             
            ]}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {}
              },           
              {
                text: 'Ok',
                handler: (data) => {
        
                }
              }
            ]} /> 

      <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          header={'Состояние доставки'}
          inputs={[
            {
              name: 'name1',
              type: 'radio',
              label: 'Формируется',
              value: 'Формируется'
            },
            {
              name: 'name1',
              type: 'radio',
              label: 'К погрузке',
              value: 'КПогрузке'
            },
            {
              name: 'name1',
              type: 'radio',
              label: 'Отправлено',
              value: 'Отправлено'
            },
            {
              name: 'name1',
              type: 'radio',
              label: 'Доставлено',
              value: 'Доставлено'
            },                
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
       
              }
            },
            {
              text: 'Ok',
              handler: (data) => {
               SStatus(data)
              }
            }
          ]}
        />
    </IonPage>
  );
};

export default Tab4;
