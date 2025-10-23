import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import { useForm } from 'react-hook-form';

const LeadDetailPage = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function load() {
      const data = await leadService.getLeadById(id);
      setLead(data);
      const inter = await interactionService.getInteractionsByLead(id);
      setInteractions(inter);
    }
    load();
  }, [id]);

  const onAddInteraction = async (values) => {
    await interactionService.createInteraction(id, lead?.assignedToUserId || lead?.createdBy, {
      type: values.type,
      content: values.content,
      sentiment: values.sentiment,
      nextSteps: values.nextSteps,
    });
    reset();
    const inter = await interactionService.getInteractionsByLead(id);
    setInteractions(inter);
  };

  if (!lead) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="card">
        <h1 className="text-xl font-semibold">{lead.firstName} {lead.lastName}</h1>
        <div className="text-sm text-gray-600">{lead.email} • {lead.phone}</div>
        <div className="text-sm text-gray-600 mt-2">Statut: {lead.status}</div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Ajouter une interaction</h2>
        <form onSubmit={handleSubmit(onAddInteraction)} className="grid gap-3">
          <select className="input-field" {...register('type')}> 
            <option>Appel</option>
            <option>Email</option>
            <option>SMS</option>
            <option>Rencontre Physique</option>
            <option>WhatsApp</option>
            <option>Autre</option>
          </select>
          <textarea className="input-field" rows={3} placeholder="Notes" {...register('content')} />
          <select className="input-field" {...register('sentiment')}>
            <option>Neutre</option>
            <option>Positif</option>
            <option>Négatif</option>
          </select>
          <input className="input-field" placeholder="Prochaines étapes" {...register('nextSteps')} />
          <button className="btn-primary w-full">Ajouter</button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Interactions</h2>
        <div className="space-y-3">
          {interactions.map((i) => (
            <div key={i.id} className="border border-gray-200 rounded-lg p-3">
              <div className="text-sm text-gray-500">{i.type} • {i.sentiment || '—'}</div>
              <div className="mt-1">{i.content}</div>
              {i.nextSteps && <div className="text-sm text-gray-600 mt-1">Next: {i.nextSteps}</div>}
            </div>
          ))}
          {interactions.length === 0 && <div className="text-gray-500">Aucune interaction.</div>}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
