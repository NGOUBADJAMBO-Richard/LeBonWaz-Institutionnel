import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useForm } from 'react-hook-form';
import { INTERACTION_TYPES, SENTIMENT_OPTIONS } from '../config/constants';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const LeadDetailPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const { currentUser } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { show } = useNotification();

  useEffect(() => {
    const load = async () => {
      const l = await leadService.getLeadById(id);
      setLead(l);
      const it = await interactionService.getInteractionsByLead(id);
      setInteractions(it);
    };
    load();
  }, [id]);

  const onAddInteraction = async (data) => {
    const res = await interactionService.createInteraction(id, currentUser.uid, data);
    if (res.success) {
      show('Interaction ajoutée', 'success');
      reset();
      const it = await interactionService.getInteractionsByLead(id);
      setInteractions(it);
    } else {
      show(res.error || 'Erreur lors de l\'ajout', 'error');
    }
  };

  if (!lead) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="card">
        <div className="text-xl font-semibold">{lead.firstName} {lead.lastName}</div>
        <div className="text-gray-600">{lead.email} • {lead.phone}</div>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-4">Ajouter une interaction</h2>
        <form onSubmit={handleSubmit(onAddInteraction)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select className="input-field" {...register('type')}>
              {INTERACTION_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <Input label="Contenu/Notes" {...register('content', { required: true })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
            <select className="input-field" {...register('sentiment')}>
              {SENTIMENT_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <Input label="Prochaines étapes" {...register('nextSteps')} />
          <Button type="submit">Ajouter</Button>
        </form>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-4">Historique des interactions</h2>
        <div className="space-y-2">
          {interactions.map((it) => (
            <div key={it.id} className="border rounded-lg p-3">
              <div className="font-medium">{it.type} • {it.sentiment}</div>
              <div className="text-gray-600 text-sm">{it.content}</div>
              {it.nextSteps && (
                <div className="text-gray-500 text-xs mt-1">Prochaines étapes: {it.nextSteps}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
