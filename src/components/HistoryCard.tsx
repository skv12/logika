import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { h_type } from "../pages/Store";
import backButton from "../res/backButton.svg";

interface t_detail {
  Номенклатура: string;
  Количество: number;
  Сумма: number;
}

interface ContainerProps {
  detail: Array<t_detail>;
  doc: h_type;
  onDismiss: () => void;
}

const HistoryCard: React.FC<ContainerProps> = ({ detail, doc, onDismiss }) => {
  var sums = [doc.Банк, doc.Карта, doc.Наличные, doc.Сертификат];
  var sums_name = ["Банк", "Карта", "Наличные", "Сертификат"];
  return (
    <>
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle className="a-center"> История </IonTitle>
            <IonButtons>
              <IonButton
                slot="start"
                onClick={() => {
                  onDismiss();
                }}
              >
                <IonIcon slot="icon-only" icon={backButton}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding-horizontal">
          <IonItem color="secondary" className="histroy-card-header">
            <IonGrid className="ion-no-padding-horizontal">
              <IonRow className="ion-justify-content-between">
                <IonCol size="8">
                  <IonText>Документ</IonText>
                </IonCol>
                <IonCol size="4">
                  <IonText>Сумма</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem>
            <IonGrid className="ion-no-padding-horizontal">
              {detail.map((elem) => {
                return (
                  <>
                    <IonRow>
                      <IonCol size="8">
                        <IonLabel color="medium" className="i-label">
                          Товар
                        </IonLabel>
                        <IonText class="ion-text-wrap">
                          {elem.Номенклатура}
                        </IonText>
                      </IonCol>
                      <IonCol size="4">
                        <IonRow>
                          <IonCol className="ion-no-padding">
                            <IonLabel
                              class="i-label price-text text_12"
                              color="secondary"
                            >
                              {elem.Количество} шт<br></br>
                            </IonLabel>
                            <IonText
                              class="ion-text-wrap price-text"
                              color="secondary"
                            >
                              {elem.Сумма} руб
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </>
                );
              })}
              <IonRow className="ion-margin-top">
                <IonCol size="8">
                  <IonText class="ion-text-wrap">Вид оплаты</IonText>
                </IonCol>
                <IonCol size="4">
                  {sums.map((e, index) => {
                    return (
                      <>
                        <IonRow>
                          <IonCol className="ion-no-padding">
                            <IonLabel
                              color="secondary"
                              className="i-label price-text text_12"
                            >
                              {sums_name[index]}
                            </IonLabel>
                            <IonText
                              class="ion-text-wrap price-text"
                              color="secondary"
                            >
                              {e} руб
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </>
                    );
                  })}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HistoryCard;
